import { DotFilledIcon } from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Grid,
  Heading,
  Strong,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useState } from "react";
import { Page } from "~/components/Pages/Page";
import { absurd } from "~/utils/absurd";

type ParsedTextBlock =
  | { type: "h1"; content: string }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "list-item"; content: string };

const parseText = (text: string): ParsedTextBlock[] =>
  text.split("\n").map((content) => {
    if (content.startsWith("# "))
      return { type: "h1" as const, content: content.substring(2) };

    if (content.startsWith("## "))
      return { type: "h2" as const, content: content.substring(3) };

    if (content.startsWith("### "))
      return { type: "h3" as const, content: content.substring(4) };

    if (content.startsWith("- "))
      return { type: "list-item" as const, content: content.substring(2) };

    return { type: "paragraph" as const, content };
  });

const TextRenderer = ({ text }: { text: string }) => {
  const parsedText = parseText(text);

  return parsedText.map(({ type, content }, i) => {
    switch (type) {
      case "h1":
        return (
          <Heading key={i} size="7">
            {content}
          </Heading>
        );

      case "h2":
        return (
          <Heading key={i} size="6">
            {content}
          </Heading>
        );

      case "h3":
        return (
          <Heading key={i} size="5">
            {content}
          </Heading>
        );

      case "paragraph":
        return (
          <Text key={i} as="p">
            {content}
          </Text>
        );

      case "list-item":
        return (
          <Text key={i} as="p">
            <DotFilledIcon style={{ position: "relative", top: 3 }} />
            {content}
          </Text>
        );

      default:
        absurd(type);
    }
  });
};

export default function EditorPage() {
  const [text, setText] = useState("");

  return (
    <Page>
      {/* @ts-expect-error This is an error... */}
      <Grid columns="2" gap="4">
        <Box>
          <TextArea
            // size="auto"
            rows={30}
            // style={{ height: "calc(100vh - 300px)" }}
            value={text}
            onChange={({ target: { value } }) => {
              setText(value);
            }}
          />
        </Box>
        <Box>
          <Card>
            <TextRenderer text={text} />
          </Card>
        </Box>
      </Grid>
    </Page>
  );
}
