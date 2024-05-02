import AntdCrud from "./Antdcrud";
import ShadcnCrud from "./Shadcncrud";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 1,
          marginRight: "5%",
          borderRight: "1px solid #ccc",
          paddingRight: "2.5%",
        }}
      >
        <AntdCrud />
      </div>
      <div style={{ flex: 1, paddingLeft: "2.5%" }}>
        <ShadcnCrud />
      </div>
    </div>
  );
}
