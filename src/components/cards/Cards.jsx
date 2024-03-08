import Image from 'next/image';

const Cards = ({ data, currentProject, setCurrentProject }) => {
  const handleNextProject = () => {
    setCurrentProject((oldVal) => {
      let newVal = oldVal + 1;
      return newVal === data.length ? (newVal = 0) : newVal;
    });
  };

  const handlePrevProject = () => {
    setCurrentProject((oldVal) => {
      let newVal = oldVal - 1;
      return newVal < 0 ? (newVal = data.length - 1) : newVal;
    });
  };

  return (
    <ul className=" flex w-full justify-center relative h-96">
      <button type="button" onClick={handlePrevProject}>
        <Image src="/assets/project/arrowLeft.svg" alt="arrow left" width={30} height={30} className="absolute  left-0 bottom-0 xl:bottom-10 xl:left-60 hover:scale-110 transition-all z-50  mb-20" />
      </button>
      {data.map((project, index) => {
        let nextProject = currentProject + 1;
        let prevProject = currentProject - 1;
        if (currentProject === data.length - 1) nextProject = 0;
        if (prevProject < 0) prevProject = data.length - 1;

        const { fields } = project;

        return (
          <li key={project.id} className={`${index === currentProject ? 'card-active' : index === nextProject ? 'card-next' : index === prevProject ? 'card-prev' : 'opacity-0 hidden'} `}>
            <Image src={fields?.images[1].url} alt="arrow right" width={400} height={400} className="w-full shadow-lg" />

            {/* Title */}
            <div className="card-title">
              <h2>{fields.name}</h2>
              <p>{fields.type}</p>
            </div>

            {/* Description */}
            <div className="card-desc">
              <h2>Description</h2>

              <p>{fields.description}</p>
            </div>

            {/* Stacks */}
            <div className="card-stack">
              <h2>Tech Stack</h2>

              <div>
                {fields.stack.map((item) => {
                  const url = `/assets/skills/${item.toLowerCase()}.svg`;

                  return <Image key={item} src={url} alt={item} width={30} height={30} />;
                })}
              </div>
            </div>

            {/* Link */}
            <div className="card-link">
              {fields.demo === '-' ? (
                ''
              ) : (
                <>
                  <a href={fields.demo} target="_blank">
                    <Image src="/assets/project/link.svg" alt="link" width={25} height={25} />

                    <h2>Demo</h2>
                  </a>

                  <a href={fields.code} target="_blank">
                    <Image src="/assets/project/github.svg" alt="link" width={25} height={25} />
                    <h2>Github</h2>
                  </a>
                </>
              )}
            </div>
          </li>
        );
      })}
      <button type="button" onClick={handleNextProject}>
        <Image src="/assets/project/arrowRight.svg" alt="arrow right" width={30} height={30} className="absolute right-0 bottom-0 hover:scale-110 transition-all mb-20 shadow-sm xl:bottom-10 xl:right-60 " />
      </button>
    </ul>
  );
};

export default Cards;
