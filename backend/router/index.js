const nhanvienRouter = require("./nhanvien");
const docgiaRouter = require("./docgia");
const nhaxuatbanRouter = require("./nhaxuatban");
const sachRouter = require("./sach");
const theodoimuonsachRouter = require("./theodoimuonsach");
const initRouter = (app) => {
  app.use("/nhanvien", nhanvienRouter);
  app.use("/docgia", docgiaRouter);
  app.use("/nhaxuatban", nhaxuatbanRouter);
  app.use("/sach", sachRouter);
  app.use("/theodoimuonsach", theodoimuonsachRouter);
};

module.exports = initRouter;
