import React from "react";
import nodemailer from 'nodemailer';







export default function SendEmail(prop){


    React.useEffect(()=>{



    function insertPTags(str) {

        if(str.length > 0){
            const chunks = str.match(/.{1,60}/g); // split string into 60-character chunks
            const pTags = chunks.map(chunk => `<p style="font-size: 12px; width: 100%; margin: 20px 0px;">${chunk}</p>`); // wrap each chunk in a <p> tag
            return pTags.join('\n'); // join the <p> tags with newline characters
        }else{
            return "";
        }
    }

    let transporter = nodemailer.createTransport({
        host: 'smtp.hostgator.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: 'info@songcosmos.com',
          pass: 'asdf4321A@2'
        }
      });
      



      let mailOptions = {
        from: 'info@songcosmos.com',
        to: `${prop.reciver}`,
        subject: 'Test email with signature',
        html: `<!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
          </head>
          <body>
            <table
              id="zs-output-sig"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                font-family: Arial, Helvetica, sans-serif;
                line-height: 0px;
                font-size: 1px;
                padding: 0px !important;
                border-spacing: 0px;
                margin: 0px;
                border-collapse: collapse;
                width: 350px;
              "
            >
              <tbody>
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      id="inner-table"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              font-family: Verdana, Geneva, sans-serif;
                              font-size: 12px;
                              font-style: normal;
                              line-height: 14px;
                              font-weight: 400;
                              padding-bottom: 20px;
                            "
                          >
                            <p style="margin: 0.04px">
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 400;
                                  color: #535353;
                                  display: inline;
                                "
                                >Hi</span
                              >
                            </p>
                          </td>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
        
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      id="inner-table"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              line-height: 0px;
                              padding-bottom: 16px;
                              padding-right: 1px;
                            "
                          >
                            <p style="margin: 0.04px">
                              <img
                                height="1"
                                width="309"
                                alt="image"
                                border="0"
                                src="http://localhost/songcosmos/static/media/logo.e17ac34113dc2f591761.png"
                              />
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      id="inner-table"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              line-height: 0px;
                              padding-bottom: 16px;
                              padding-right: 1px;
                            "
                          >
                            <p style="margin: 0.04px">
                              <img
                                height="80"
                                width="236"
                                alt="logo"
                                border="0"
                                src="http://localhost/songcosmos/static/media/logo.e17ac34113dc2f591761.png"
                              />
                            </p>
        
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      id="inner-table"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              line-height: 0px;
                              padding-bottom: 16px;
                              padding-right: 1px;
                            "
                          >
                            <p style="margin: 0.04px">
                              <img
                                height="1"
                                width="309"
                                alt="image"
                                border="0"
                                src="https://img2.gimm.io/90619c90-3f78-40e8-86a9-db0fbc71ea6b/img.png"
                              />
                            </p>
                          </td>
                        </tr>
                        <h3 style="font-size:14px;width: 100%;margine-bottom:50px">${prop.title1}</h3>
                            ${insertPTags(prop.discrip)}
                        <h3 style="font-size:14px;width: 100%;margine-top:50px">Thank you!</h3>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      id="inner-table"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              font-family: Verdana, Geneva, sans-serif;
                              font-size: 12px;
                              font-style: normal;
                              line-height: 14px;
                              font-weight: 400;
                              padding-bottom: 8px;
                            "
                          >
                            <p style="margin: 0.04px">
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 700;
                                  color: #3589eb;
                                  display: inline;
                                "
                                >Office</span
                              >
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 400;
                                  color: #535353;
                                  display: inline;
                                "
                                >+1 888 425 7421&nbsp;</span
                              >
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 700;
                                  color: #3589eb;
                                  display: inline;
                                "
                                >Mobile</span
                              >
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 400;
                                  color: #535353;
                                  display: inline;
                                "
                                >+1 555 265 5887&nbsp;</span
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      id="inner-table"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              font-family: Verdana, Geneva, sans-serif;
                              font-size: 12px;
                              font-style: normal;
                              line-height: 14px;
                              font-weight: 400;
                              padding-bottom: 8px;
                            "
                          >
                            <p style="margin: 0.04px">
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 700;
                                  color: #3589eb;
                                  display: inline;
                                "
                                >Email</span
                              >
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 400;
                                  color: #535353;
                                  display: inline;
                                "
                                >info@songcosmos.com&nbsp;</span
                              >
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 700;
                                  color: #3589eb;
                                  display: inline;
                                "
                                >Web</span
                              >
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 400;
                                  color: #535353;
                                  display: inline;
                                "
                                >www.songcosmos.com&nbsp;</span
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      id="inner-table"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-collapse: collapse;
                              font-family: Verdana, Geneva, sans-serif;
                              font-size: 12px;
                              font-style: normal;
                              line-height: 14px;
                              font-weight: 400;
                              padding-bottom: 12px;
                            "
                          >
                            <p style="margin: 0.04px">
                              <span
                                style="
                                  font-family: Verdana, Geneva, sans-serif;
                                  font-size: 12px;
                                  font-style: normal;
                                  line-height: 14px;
                                  font-weight: 400;
                                  color: #535353;
                                  display: inline;
                                "
                                >4528 Glen Street, WELLING, OK 74471 USA</span
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0px !important">
                    <table
                      id="inner-table"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        font-family: Arial, Helvetica, sans-serif;
                        line-height: 0px;
                        font-size: 1px;
                        padding: 0px !important;
                        border-spacing: 0px;
                        margin: 0px;
                        border-collapse: collapse;
                      "
                    >
                      <tbody>
                        <tr>
                          <td style="padding-right: 10px">
                            <p style="margin: 0.04px">
                              <img
                                height="24"
                                width="24"
                                alt="facebook"
                                border="0"
                                src="https://img1.gimm.io/assets/social/96/native/2/facebook.png"
                              />
                            </p>
                          </td>
                          <td style="padding-right: 10px">
                            <p style="margin: 0.04px">
                              <img
                                height="24"
                                width="24"
                                alt="twitter"
                                border="0"
                                src="https://img1.gimm.io/assets/social/96/native/2/twitter.png"
                              />
                            </p>
                          </td>
                          <td style="padding-right: 10px">
                            <p style="margin: 0.04px">
                              <img
                                height="24"
                                width="24"
                                alt="instagram"
                                border="0"
                                src="https://img1.gimm.io/assets/social/96/native/2/instagram.png"
                              />
                            </p>
                          </td>
                          <td style="padding-right: 10px">
                            <p style="margin: 0.04px">
                              <img
                                height="24"
                                width="24"
                                alt="linkedin"
                                border="0"
                                src="https://img1.gimm.io/assets/social/96/native/2/linkedin.png"
                              />
                            </p>
                          </td>
                          <td style="padding-right: 1px">
                            <p style="margin: 0.04px">
                              <img
                                height="24"
                                width="24"
                                alt="map"
                                border="0"
                                src="https://img1.gimm.io/assets/social/96/native/2/map.png"
                              />
                            </p>
                          </td>
                          <td style="padding: 0px !important"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="border-collapse: collapse; padding-bottom: 16px">
                    <span></span>
                  </td>
                </tr>
                <tr>
                  <td style="border-collapse: collapse">
                    <p style="margin: 0.04px">
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
        `
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
         // console.log(error);
        } else {
        //  console.log('Email sent: ' + info.response);
        }
      });




    },[])
      
}