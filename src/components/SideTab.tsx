// components/SideTab.tsx
const SideTab = () => {
	return (
		<div className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0">
			<div className="p-4">
				<h2 className="text-2xl font-semibold">My App</h2>
			</div>
			<nav className="mt-10">
				<ul>
					<li className="p-4 hover:bg-gray-700">
						<a href="#">Home</a>
					</li>
					<li className="p-4 hover:bg-gray-700">
						<a href="#">About</a>
					</li>
					<li className="p-4 hover:bg-gray-700">
						<a href="#">Services</a>
					</li>
					<li className="p-4 hover:bg-gray-700">
						<a href="#">Contact</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default SideTab;
