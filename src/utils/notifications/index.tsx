import * as Notify from 'expo-notifications';

// Função para enviar/agendar notificação local para um horário específico ou repetitivo
export async function sendLocalNotification({
  title,
  body,
  date,
  repeatIntervalHours
}: {
  title: string,
  body: string,
  date: Date,
  repeatIntervalHours?: number
}) {
  if (repeatIntervalHours) {
    // Agendar múltiplas notificações para as próximas 24h
    const now = new Date();
    let next = new Date(date);
    // Se o horário já passou hoje, começa do próximo ciclo
    if (next < now) {
      const diff = now.getTime() - next.getTime();
      const cycles = Math.ceil(diff / (repeatIntervalHours * 60 * 60 * 1000));
      next = new Date(next.getTime() + cycles * repeatIntervalHours * 60 * 60 * 1000);
    }
    // Agendar para as próximas 24h
    for (let i = 0; i < Math.floor(24 / repeatIntervalHours); i++) {
      const triggerDate = new Date(next.getTime() + i * repeatIntervalHours * 60 * 60 * 1000);
      await Notify.scheduleNotificationAsync({
        content: { title, body },
        trigger: { type: Notify.SchedulableTriggerInputTypes.DATE, date: triggerDate },
      });
    }
  } else {
    // Agendamento único para o horário definido
    await Notify.scheduleNotificationAsync({
      content: { title, body },
      trigger: { type: Notify.SchedulableTriggerInputTypes.DATE, date },
    });
  }
}