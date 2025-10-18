import { E621Search } from '../../e621';
import { useState } from 'react';
import { WalltakerSearch } from '../../walltaker';
import { LocalImport } from '../../local';
import UrlAdder from './UrlAdder';
import { WaTabGroup, WaTab } from '@awesome.me/webawesome/dist/react';
import styled from 'styled-components';
import { Fields } from '../../common';

const tabs: Record<
  string,
  {
    label: string;
    component: React.ReactNode;
  }
> = {
  e621: {
    label: 'e621',
    component: <E621Search />,
  },
  walltaker: {
    label: 'walltaker',
    component: <WalltakerSearch />,
  },
  device: {
    label: 'device',
    component: <LocalImport />,
  },
  url: {
    label: 'url',
    component: <UrlAdder />,
  },
};

const StyledServiceSettingsTabs = styled.div`
  margin-bottom: 12px;
`;

const StyledServiceFields = styled(Fields)`
  padding-top: 0;
`;

export const ServiceSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('e621');
  const tabsKeys = Object.keys(tabs);

  return (
    <StyledServiceFields title="Services">
      <p style={{ marginBottom: 8, color: '#aaa' }}>
        Pick a source to add images from (e621, walltaker, device, or url).
      </p>

      <StyledServiceSettingsTabs>
        <WaTabGroup
          onChange={(event: any) => setActiveTab(event.detail?.value ?? activeTab)}
          value={activeTab}
        >
          {tabsKeys
            .filter(key => key !== 'walltaker')
            .map(tab => (
              <WaTab key={tab} panel={tab} active={activeTab === tab}>
                {tabs[tab].label}
              </WaTab>
            ))}
        </WaTabGroup>
      </StyledServiceSettingsTabs>

      {tabs[activeTab].component}
    </StyledServiceFields>
  );
};

export default ServiceSettings;
