const express = require("express");
const app = express();
const Pusher = require("pusher");

var pusher = new pusher({
  appId: "935837",
  key: "ef79256691597d1e299f",
  secret: "bfc07878d4f98629bbc2",
  cluster: "ap3",
  encrypted: true
});
