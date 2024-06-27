import React from 'react';
import SchoolSettingSwitch from '@/components/schools/edit/SchoolSettingSwitch';
import { School } from '@/utils/school.interface';
import SchoolShippinFeeInput from '@/components/schools/edit/SchoolShippinFeeInput';

interface Props {
  school: School;
}

export default function SchoolSetting({ school }: Props) {

  return (
    <div className="space-y-6">
      <SchoolSettingSwitch
        title="性別記入の表示"
        description="男女の選択を追加する場合はチェック"
        school={school}
        prop="isGender"
        value={school.isGender}
      />
      <SchoolSettingSwitch
        title="住所欄の表示"
        description="送り先が必要な時はチェック"
        school={school}
        prop="isAddress"
        value={school.isAddress}
      />
      <SchoolSettingSwitch
        title="送料の有無"
        description="個別配送や送料を請求する場合はチェック"
        school={school}
        prop="isShipping"
        value={school.isShipping}
      />
      {school.isShipping && (
        <SchoolShippinFeeInput school={school} />
      )}
    </div>
  );
}
