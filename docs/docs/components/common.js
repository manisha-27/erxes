import React from "react";
import Table from "../../../ui/src/modules/common/components/table";
import CodeBlock from "@theme/CodeBlock";

export function renderApiTable(btnName, table) {
  return (
    <>
      {btnName && (
        <CodeBlock className="language-javascript">{`import ${btnName} from "erxes-ui/lib/components/${btnName}";`}</CodeBlock>
      )}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}