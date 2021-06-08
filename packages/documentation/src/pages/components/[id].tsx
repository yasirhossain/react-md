import React from "react";
import { NextFC } from "next";

import NotFoundPage from "components/NotFoundPage";
import { useHotReload } from "hooks/useHotReload";
import { qsToString } from "utils/routes";
import { ExampleList, ExamplesConfig } from "components/Examples/types";
import Examples from "components/Examples/Examples";

interface DemoExports {
  config?: ExamplesConfig;
  examples: ExampleList | null;
  description: string;
}

export interface ComponentsProps extends DemoExports {
  name: string;
}

const getProps = async (name: string): Promise<DemoExports> =>
  import(`../../examples/${name}/examples.ts`).catch(() => ({
    examples: null,
    description: "",
  }));

const Components: NextFC<ComponentsProps> = ({
  name,
  config: propConfig,
  examples: propExamples,
  description: propDescription,
}) => {
  const { examples, description, config } = useHotReload(
    name,
    {
      config: propConfig,
      examples: propExamples,
      description: propDescription,
    },
    getProps
  );

  if (examples === null) {
    return <NotFoundPage />;
  }

  return (
    <Examples
      name={name}
      examples={examples}
      description={description}
      {...config}
    />
  );
};

Components.getInitialProps = async ({ query }) => {
  const name = qsToString(query.id);
  const props = await getProps(name);

  return { ...props, name };
};

export default Components;
