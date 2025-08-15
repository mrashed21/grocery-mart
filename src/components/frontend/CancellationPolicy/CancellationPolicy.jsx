"use client";
import Contain from "@/components/common/Contain";
import useGetSettingData from "@/lib/getSettingData";

const CancellationPolicy = () => {
  const { data: settingsData, isLoading: settingDataLoading } =
    useGetSettingData();
  const settingData = settingsData?.data?.[0];
  return (
    <Contain>
      <main className="mt-10">
        <div
          dangerouslySetInnerHTML={{ __html: settingData?.cancellation_policy }}
        />
      </main>
    </Contain>
  );
};

export default CancellationPolicy;
