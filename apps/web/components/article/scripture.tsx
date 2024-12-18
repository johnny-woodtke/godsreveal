export type ScriptureProps = {
  text: React.ReactNode;
  cite: string;
};

export default function Scripture({ text, cite }: ScriptureProps) {
  return (
    <blockquote>
      <p>{text}</p>
      <cite>{cite}</cite>
    </blockquote>
  );
}
