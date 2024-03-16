export default function Page({ params }: { params: { dwarf: string } }) {
  return (
    <div>
      <h1>Discussion for {params.dwarf}</h1>
      <p>Discussion goes here</p>
    </div>
  );
}
