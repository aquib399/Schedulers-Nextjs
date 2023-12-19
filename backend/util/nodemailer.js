const nodemailer = require("nodemailer");
const user = process.env.USER;
const pass = process.env.PASS;
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});
exports.sendMail = function sendMail(to, fName, schedule) {
  console.log(to, fName);
  const otp = Math.floor(Math.random() * 899999 + 100000);

  const option = {
    from: "SCHEDULERS",
    to,
    subject: schedule ? "Hey folk here's your schedule" : "Verify Your Account To Create An Account",
    html: schedule ? getSchedule(schedule) : getHtml(otp, fName),
  };

  return new Promise((res, rej) => {
    transport.sendMail(option, (err, info) => {
      if (!err) {
        console.log("Success ->", info.response);
        res(otp);
      } else {
        console.log("Error is this : ", err);
        res(false);
      }
    });
  });
};
function getSchedule(schedule) {
  return schedule;
}
function getHtml(otp, fName) {
  return `<div style="margin: auto; max-width: 600px; font-family: 'Verdana', 'consolas'">
  <table width="100%">
    <tbody>
      <tr>
        <td style="background-color: #fff; color: #444; line-height: 120%; padding: 15px 35px">
          <h1 style="font-size: 18px; font-weight: bold; line-height: 1.3;">Hey ${fName} Verify your email address</h1>
          <p style="margin: 0; padding: 0; font-size: 12px; text-align: justify;">
            Thanks for being a member of SCHEDULERS. We want to make sure it's really you. Please enter the following verification code when
            prompted. If you see this suspicious or don't want to create an account, ignore this message.
          </p>
        </td>
      </tr>
      <tr>
        <td
          style="
            color: #444;
            font-size: 14px;
            line-height: 140%;
            padding-top: 0;
            text-align: center;
          "
        >
          <div style="font-weight: bold; padding-bottom: 10px">Verification code</div>
          <div style="color: #000; font-size: 32px; font-weight: bold; padding-bottom: 10px">${otp}</div>
          <p style="color: #797979; font-style: italic; font-size: 10px">*Exipires in 10 Minutes*</p>
        </td>
      </tr>
      <tr>
        <td
          style="background-color: #fff; border-top: 1px solid #e0e0e0; color: #777; font-size: 12px; line-height: 140%; padding: 10px 35px"
        >
          <p style="margin-bottom: 10px; padding: 0; font-size:12px">
            Todo App will never email you and ask you to disclose or verify your password, credit card, or banking account number.
          </p>
          <p style="margin: 0px 0px 10px 0px">Regards</p>
          <p style="margin: 0px 0px 5px 0px">Team Todo</p>
          <a href="mailto:projectk399@gmail.com">projectk399@gmail.com</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;
}
