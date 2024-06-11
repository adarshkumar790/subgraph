import Image from "next/image";
import { getData } from "@/utils/subgraph";
import Token from "@/component/Token";
import Pool from "@/component/Pool";

export default function Home() {
  return (
    <>

    <div className="container mx-auto p-10">
      
        <Token/>
        </div>
        <div className="container mx-auto  p-10">
          
        <Pool/>
        </div>
    </>
     );
}
