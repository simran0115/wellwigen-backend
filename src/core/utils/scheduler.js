import Delivery from "../../features/delivery/delivery.model.js";

function getNextDates(startDate, daysOfWeek) {
  let result = [];
  let date = new Date(startDate);

  while (result.length < 10) {
    let dayName = date.toLocaleString("en-US", { weekday: "long" });

    if (daysOfWeek.includes(dayName)) {
      result.push(new Date(date));
    }

    date.setDate(date.getDate() + 1);
  }

  return result;
}

async function generateSchedule(subscription) {
  const dates = getNextDates(
    subscription.startDate,
    subscription.deliveryDays
  );

  const deliveries = dates.map((d) => ({
    userId: subscription.userId,
    subscriptionId: subscription._id,
    deliveryDate: d,
  }));

  await Delivery.insertMany(deliveries);
}

export { generateSchedule };