"use client";
import Contain from "@/components/common/Contain";
import useGetSettingData from "@/lib/getSettingData";

const RefundPolicy = () => {
  const { data: settingsData, isLoading: settingDataLoading } =
    useGetSettingData();
  const settingData = settingsData?.data?.[0];
  return (
    <Contain>
      <section className="mt-10">
        <div dangerouslySetInnerHTML={{ __html: settingData?.refund_policy }} />
      </section>
    </Contain>
  );
};

export default RefundPolicy;
