import Elysia from "elysia";

export default new Elysia().guard({
  as: "scoped",
});
