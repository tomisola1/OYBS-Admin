import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <>
        <aside className="w">
				<div className="">
					<img src="/assets/logo.svg" alt="juripass logo" />
				</div>
				<ul className="">
					<li className="">
						<Link
							href={""}
							className={""}>
							{/* <Category2 variant="Bold" size={19} /> */}
							<span>Dashboard</span>
						</Link>
					</li>

					<li className="">
						<Link
							href={''}
							className={""}>
							{/* <Layer variant="Bold" size={20} /> */}
							<span>Affidavits</span>
						</Link>
					</li>
				</ul>
				<div className="">
					<button>
						<span>Logout</span>
					</button>
				</div>
			</aside>
    </>
  )
}

export default Sidebar