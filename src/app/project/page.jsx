import Content from './Content';

export const metadata = {
  title: 'Project Page',
  description: 'Project description',
};

const Project = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2 py-0 m-0">
      <h1 className="text-white xl:text-6xl mt-0 ">Projects</h1>

      <Content />
    </section>
  );
};

export default Project;
