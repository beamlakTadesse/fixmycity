import StatusCard from "components/StatusCard";
import SettingsForm from "components/SettingsForm";
import ProfileCard from "components/ProfileCard";
import { useState } from "react";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import ChangePasswordCard from "components/changePassword";
import { Button } from "components/report/shared/Button";
import { useTranslation, Trans } from "react-i18next";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

export default function Dashboard() {
  const lngs = {
    en: { nativeName: "English" },
    am: { nativeName: "Amharic" },
  };
  const { t, i18n } = useTranslation();
  const [editProfile, setEditProfile] = useState(false);

  return (
    <>
      <Sidebar />
      <div className="bg-[#DEB887] pt-14 pb-28 px-3 md:px-8 h-auto"></div>

      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-6">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-16">
              <ProfileCard
                editProfile={editProfile}
                setEditProfile={setEditProfile}
              />
            </div>

            {editProfile && (
              <div className="xl:col-start-4 xl:col-end-7 px-4 mb-16 ">
                <SettingsForm
                  editProfile={editProfile}
                  setEditProfile={setEditProfile}
                />
              </div>
            )}
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-16">
              <ChangePasswordCard />
            </div>
            <div>
              <Card>
                <CardHeader color="brown" contentPosition="none">
                  <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">
                      <Trans i18nKey="settings.changeLanguage">
                        Change Language
                      </Trans>
                    </h2>
                  </div>
                </CardHeader>
                <CardBody>
                  {Object.keys(lngs).map((lng) => (
                    <button
                      key={lng}
                      style={{
                        fontWeight: i18n.language === lng ? "bold" : "normal",
                      }}
                      type="submit"
                      onClick={() => {
                        i18n.changeLanguage(lng);
                      }}
                    >
                      {lngs[lng].nativeName}
                    </button>
                  ))}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
