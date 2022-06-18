import Card from "@material-tailwind/react/Card";
import Image from "@material-tailwind/react/Image";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";

import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import ProfilePicture from "assets/img/team-1-800x800.jpg";
import { CheckPassword } from "helpers/validation";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { getUserId } from "helpers/utils";
import { getRol } from "helpers/utils";
import { url } from "helpers/strings";
import { isEqual } from "lodash";
import { ChangePassword } from "helpers/validation";
import { Trans } from "react-i18next";

export default function ChangePasswordCard() {
  const [conf_new_password, setConf] = useState();
  const [n_password, setNewpassword] = useState();
  const [o_password, setOldPass] = useState();
  const [isError, setError] = useState(false);
  const [inputs, setInputs] = useState({
    new_password: "",
    old_password: "",
  });
  const url1 = `${url}/v1/admins/api/change-password/`;
  const postUpdate = async () => {
    if (o_password && n_password && conf_new_password) {
      console.log(1);
      if (n_password === conf_new_password) {
        console.log(2);
        console.log(CheckPassword(o_password));
        if (
          // CheckPassword(o_password) &&
          CheckPassword(n_password) &&
          CheckPassword(conf_new_password)
        ) {
          console.log(3);
          setInputs((inputs) => ({
            old_password: o_password,
            new_password: n_password,
          }));

          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              old_password: o_password,
              new_password: n_password,
            }),
          };
          try {
            const response = await fetch(url1, requestOptions);
            if (!response.ok) {
              const json = await response.json();
              alert(json.Detail);
            }
            const json = await response.json();
            alert(json.Detail);

            console.log(json);
          } catch (error) {
            console.log("error", error);
            setError(true);
          }
        }

        setTimeout(() => {
          //   setIsLoading(false);
        }, 1500);
        setConf("");
        setNewpassword("");
        setOldPass("");
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Card>
        <CardHeader color="brown">
          <h6 className="text-brown text-sm mt-9 mb-6 font-bold uppercase">
            <Trans i18nKey="profile.changePassword">Change Password</Trans>
          </h6>
        </CardHeader>
        <CardBody>
          <form>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <lable>
                <Trans i18nKey="profile.oldpassword">Old password</Trans>{" "}
              </lable>
              <Input
                type="password"
                value={o_password}
                name="old_password"
                data-cy="input_old_password"
                color="blue"
                onChange={(e) => setOldPass(e.target.value)}
                placeholder={
                  <Trans i18nKey="profile.oldpassword">Old password</Trans>
                }
              />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <Trans i18nKey="profile.newpassword">new password</Trans>{" "}
              <Input
                type="password"
                value={n_password}
                name="new_password"
                data-cy="input_new_password"
                color="blue"
                onChange={(e) => setNewpassword(e.target.value)}
                placeholder={
                  <Trans i18nKey="profile.newpassword">new password</Trans>
                }
              />
            </div>
            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
              <Trans i18nKey="profile.confirmpassword">confirm password</Trans>{" "}
              <Input
                type="password"
                value={conf_new_password}
                name="conf_new_password"
                data-cy="input_conf_new_password"
                color="blue"
                onChange={(e) => setConf(e.target.value)}
                placeholder={
                  <Trans i18nKey="profile.confirmpassword">
                    confirm password
                  </Trans>
                }
              />
            </div>
          </form>
          {n_password != conf_new_password && (
            <p data-cy="missmatch-error" className="text-red-400">
              <Trans i18nKey="profile.passwordmissmatch">
                {" "}
                Password missmatch
              </Trans>{" "}
            </p>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-6">
            <Button
              className="xl:col-start-3 xl:col-end-6 px-4 mb-10"
              color="brown"
              onClick={() => {
                postUpdate();
              }}
              data-cy="btn-changePassword"
            >
              <Trans i18nKey="profile.changePassword">Change Password</Trans>
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
