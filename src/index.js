const express = require("express");
const app = express();
const Pusher = require("pusher");

var channel = "vagabond";

var pusher = new Pusher({
  appId: "935837",
  key: "ef79256691597d1e299f",
  secret: "bfc07878d4f98629bbc2",
  cluster: "ap3",
  useTLS: true
});

app.get("/play", (req, res) => {
  res.send("Playing!");
  pusher.trigger(channel, "play", { message: "Playback Started" });
});

app.get("/pause", (req, res) => {
  res.send("Paused!");
  pusher.trigger(channel, "pause", { message: "Playback Started" });
});

app.get("/seeked", (req, res) => {
  var t = Number(req.query.time); // your seconds
  var time =
    ("0" + (Math.floor(t / 3600) % 24)).slice(-2) +
    ":" +
    ("0" + (Math.floor(t / 60) % 60)).slice(-2) +
    ":" +
    ("0" + (t % 60)).slice(-2);
  res.send(`Seeked ${time}`);
  //pusher.trigger(channel, "seek", { data: req.query.time });
});

function humanReadableToSeconds(t) {
  var p = t.split(":"),
    s = 0,
    m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
}

var shows = {
  Vagabond: 80,
  Dbs: 120
};

app.get("/seek", (req, res) => {
  var HumanReadable = String(req.query.time);
  var seconds = humanReadableToSeconds(HumanReadable);
  res.send(`Seeked at ${HumanReadable}, ${seconds}`);
  pusher.trigger(channel, "seek", { data: seconds });
});

app.get("/skip_intro", (req, res) => {
  var show = req.query.show;
  res.send(`Skipped to ${String(shows[show])} seconds`);
  pusher.trigger(channel, "seek", { data: shows[show] });
});

app.get("/", (req, res) => {
  res.send("OK!");
});
app.listen();
