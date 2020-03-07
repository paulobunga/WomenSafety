package io.invertase.firebase.messaging;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.PowerManager;
import android.provider.Settings;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.facebook.react.HeadlessJsTaskService;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONObject;

import io.invertase.firebase.common.ReactNativeFirebaseEventEmitter;
import io.invertase.firebase.common.SharedUtils;

public class ReactNativeFirebaseMessagingService extends FirebaseMessagingService {
  private static final String TAG = "RNFirebaseMsgService";

  @Override
  public void onSendError(String messageId, Exception sendError) {
    ReactNativeFirebaseEventEmitter emitter = ReactNativeFirebaseEventEmitter.getSharedInstance();
    emitter.sendEvent(ReactNativeFirebaseMessagingSerializer.messageSendErrorToEvent(messageId, sendError));
  }

  @Override
  public void onDeletedMessages() {
    ReactNativeFirebaseEventEmitter emitter = ReactNativeFirebaseEventEmitter.getSharedInstance();
    emitter.sendEvent(ReactNativeFirebaseMessagingSerializer.messagesDeletedToEvent());
  }

  @Override
  public void onMessageSent(String messageId) {
    Log.d(TAG, "Idhar aaraha he");
    ReactNativeFirebaseEventEmitter emitter = ReactNativeFirebaseEventEmitter.getSharedInstance();
    emitter.sendEvent(ReactNativeFirebaseMessagingSerializer.messageSentToEvent(messageId));
  }

  @Override
  public void onNewToken(String token) {
    ReactNativeFirebaseEventEmitter emitter = ReactNativeFirebaseEventEmitter.getSharedInstance();
    emitter.sendEvent(ReactNativeFirebaseMessagingSerializer.newTokenToTokenEvent(token));
  }

  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {
    Log.d(TAG, "onMessageReceived");
    ReactNativeFirebaseEventEmitter emitter = ReactNativeFirebaseEventEmitter.getSharedInstance();




    // ----------------------
    //  NOTIFICATION Message
    // --------------------\/
    // with no data
    if (remoteMessage.getNotification() != null && remoteMessage.getData().size() == 0) {
      // TODO broadcast intent when notifications module ready
      return;
    }

    // ----------------------
    //      DATA Message
    // --------------------\/

    //  |-> ---------------------
    //      App in Foreground
    //   ------------------------
    if (SharedUtils.isAppInForeground(getApplicationContext())) {
      emitter.sendEvent(ReactNativeFirebaseMessagingSerializer.remoteMessageToEvent(remoteMessage));
      return;
    }


    //  |-> ---------------------
    //    App in Background/Quit
    //   ------------------------
    try {
      Intent i = new Intent("womensafety.intent.action.Launch");

      System.out.println(remoteMessage);
      JSONObject jsonData;
      jsonData = new JSONObject(remoteMessage.getData());
      Log.d("starting it up man ",jsonData.toString());


      i.putExtra("message", jsonData.toString());

      i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

      PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, i, PendingIntent.FLAG_ONE_SHOT);

      Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);

      NotificationManager mNotifyManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

      if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
        int importance = NotificationManager.IMPORTANCE_HIGH;
        NotificationChannel mChannel = new NotificationChannel("501", "AlertChannel", importance);
        mChannel.setDescription("Alert notification");
        mChannel.enableLights(true);
        mChannel.setLightColor(Color.RED);
        mChannel.enableVibration(true);
        mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
        mNotifyManager.createNotificationChannel(mChannel);
      }

      NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(this, "501");

      wakeUpScreen();

      mBuilder.setContentTitle("Someone's in trouble")
        .setContentText("Emergency")
        .setSmallIcon(R.drawable.redbox_top_border_background)
        .setAutoCancel(true)
        .setSound(defaultSoundUri)

        .setColor(Color.parseColor("#FFD600"))
        .setContentIntent(pendingIntent)
        .setChannelId("501")
        .setCategory(NotificationCompat.CATEGORY_CALL)
        .setPriority(NotificationCompat.PRIORITY_HIGH)
        .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);

      mNotifyManager.notify(1, mBuilder.build());



      Intent intent = new Intent(getApplicationContext(), ReactNativeFirebaseMessagingHeadlessService.class);
      intent.putExtra("message", remoteMessage);
      ComponentName name = getApplicationContext().startService(intent);
      if (name != null) {
        HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
      }
    } catch (IllegalStateException ex) {
      Log.e(
        TAG,
        "Background messages only work if the message priority is set to 'high'",
        ex
      );
    }
  }

  /* when your phone is locked screen wakeup method*/
  private void wakeUpScreen() {
    PowerManager pm = (PowerManager) this.getSystemService(Context.POWER_SERVICE);
    boolean isScreenOn = pm.isInteractive();

    Log.e("screen on......", "" + isScreenOn);
    if (isScreenOn == false) {
      PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.ON_AFTER_RELEASE, "womensafety:AppLock");
      wl.acquire(10000);
      PowerManager.WakeLock wl_cpu = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "womensafety:AppWakeCPULock");
      wl_cpu.acquire(10000);
    }
  }
}
