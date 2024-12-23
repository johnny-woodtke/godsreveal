import Elysia, { t } from "elysia";

export default new Elysia().guard({
  as: "scoped",
  beforeHandle: ({ cookie, error }) => {
    console.log("cookie", cookie);
  },
});
