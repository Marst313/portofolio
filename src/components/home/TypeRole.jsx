"use client";

import { TypeAnimation } from "react-type-animation";

const TypeRole = ({ className = "" }) => <TypeAnimation sequence={["Website Developer", 2000, "", 500, "Software Engineer", 2000, ""]} speed={30} wrapper="span" cursor repeat={Infinity} className={className} />;

export default TypeRole;
