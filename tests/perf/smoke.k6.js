import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.01"]
  }
};

export default function () {
  const response = http.get(`${__ENV.BASE_API_URL || "https://jsonplaceholder.typicode.com"}/users`);
  check(response, {
    "status is 200": (r) => r.status === 200,
    "response under 2s": (r) => r.timings.duration < 2000
  });
}
