import Meta from "../components/seo";
import Login from "../components/auth/Login";

export default function LoginPage() {
  return (
    <>
      <Meta
        title="Admin Dashboard - AINEXIM"
        description="AINEXIM, step into the future of virtual work experience."
        ogUrl="https://ainexim.com"
        thumbnail="https://i.postimg.cc/MKBWj4pd/thumbnail.png"
        keywords="AINEXIM, Virtual work"
      ></Meta>
      <Login />
    </>
  );
}
