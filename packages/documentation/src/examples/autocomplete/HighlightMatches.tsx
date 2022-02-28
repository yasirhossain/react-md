import React, { ReactElement, useCallback, useState } from "react";
import {
  AppBar,
  AppBarAction,
  AppBarNav,
  AppBarTitle,
} from "@react-md/app-bar";
import { AutoComplete, AutoCompleteHandler } from "@react-md/autocomplete";
import { KeyboardVoiceSVGIcon, SearchSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { PhoneOnly, useAppSize } from "@react-md/utils";

import Phone, { ClosePhone, PhoneAppBar } from "components/Phone";
import dessertList, { Dessert } from "constants/desserts";

import DessertTable from "./DessertTable";
import styles from "./HighlightMatches.module.scss";

const desserts = dessertList.map(({ name }) => name);

export default function HighlightMatches(): ReactElement {
  const [dessert, setDessert] = useState<Dessert | null>(null);
  const onAutoComplete = useCallback<AutoCompleteHandler>(({ dataIndex }) => {
    setDessert(dessertList[dataIndex]);
  }, []);

  const { isPhone } = useAppSize();

  return (
    <Phone
      id="highlight-example"
      onPhoneClose={() => setDessert(null)}
      disableAppBar
      disableContent={isPhone}
      contentClassName={styles.container}
      appBar={
        <PhoneAppBar>
          <AppBar>
            <AppBarNav id="phone-nav">
              <SearchSVGIcon />
            </AppBarNav>
            <AppBarTitle>
              <AutoComplete
                id="phone-search"
                placeholder="Search"
                data={desserts}
                onAutoComplete={onAutoComplete}
                highlight
                theme="none"
                listboxWidth="auto"
                listboxClassName={styles.listbox}
                vhMargin={0}
                vwMargin={0}
                clearOnAutoComplete
              />
            </AppBarTitle>
            <AppBarAction id="phone-action" first last>
              <KeyboardVoiceSVGIcon />
            </AppBarAction>
          </AppBar>
        </PhoneAppBar>
      }
    >
      <Text type="headline-6" style={{ margin: "1rem" }}>
        {dessert ? "Nutrition" : "No Dessert Chosen"}
      </Text>
      <DessertTable dessert={dessert} />
      <PhoneOnly>
        <ClosePhone id="phone-close" floating />
      </PhoneOnly>
    </Phone>
  );
}
