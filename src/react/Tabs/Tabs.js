import React from 'react';
import SW from './Tabs.swiss';

// No support for horizontal scrolling for now
export default function Tabs({ tabs, selected, onPress }) {
  return (
    <SW.Wrapper>
      {tabs.map((item, index) => {
        return (
          <SW.Tab
            key={index}
            onPress={() => {
              onPress(item);
            }}
          >
            <SW.TabText selected={selected === item}>
              {item.toUpperCase()}
            </SW.TabText>
          </SW.Tab>
        );
      })}
    </SW.Wrapper>
  );
}
