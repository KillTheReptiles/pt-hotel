import * as cron from "node-cron";
import Post from "../models/Post";

export function time_zone_bogota(date) {
  const time_zone = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
  });
  date = time_zone.format(date);
  return date;
}

cron.schedule(
  "* 0 0 * * *", //* 0 0 * * *  means 00:00 AM of everyday https://www.npmjs.com/package/node-cron
  async function () {
    let today_date = time_zone_bogota(new Date()); //format the time zone date to Bogotá, Colombia

    const posts = await Post.find();
    for (const post of posts) {
      //if is true, the highlight is active, but if is false, the highlight is expired or is not highlighted yet
      if (
        Date.parse(time_zone_bogota(post.start_highlight)) <=
          Date.parse(today_date) &&
        Date.parse(time_zone_bogota(post.due_highlight)) >=
          Date.parse(today_date)
      ) {
        await Post.findByIdAndUpdate(
          post._id,
          { isHighlighted: true },
          { new: true }
        );
      } else {
        await Post.findByIdAndUpdate(
          post._id,
          { isHighlighted: false },
          { new: true }
        );
      }
    }
  },
  { timezone: "America/Lima" }
);
