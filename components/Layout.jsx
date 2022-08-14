import { Button } from "@web3uikit/core";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <>
    <SideBar />
      <div>
        <div className="flex h-screen">
          <div className="mt-16 text-center pl-24 pr-24">
            <h1 className="text-2xl p-7 font-bold">About</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo vitae
              eveniet est molestiae perferendis? Odio veritatis tempora optio ea
              maxime molestias quos commodi atque ipsum veniam? Facilis enim
              quibusdam impedit?
            </p>
            <h1 className="text-xl pt-20 pb-7">How To Stake</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              voluptate cumque quasi tempore nobis nisi, reiciendis sint
              dignissimos dolore, nostrum natus. Reiciendis veniam sunt
              voluptate veritatis maxime aut dolores obcaecati? Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Nulla atque
              voluptates adipisci! Eos, itaque nostrum. Voluptatem, minima.
              Molestiae adipisci blanditiis modi quasi error. Aliquid ea
              asperiores numquam sit nesciunt blanditiis!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
