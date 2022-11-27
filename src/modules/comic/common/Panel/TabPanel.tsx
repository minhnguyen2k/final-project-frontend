import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<Props> = ({ children, index, value }) => {
  return (
    <div role="tabpanel" id={`tabpanel-${index}`} hidden={value !== index} aria-labelledby={`tab-${index}`}>
      {value === index && children}
    </div>
  );
};

export default TabPanel;
