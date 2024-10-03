import Link from "next/link";
import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
import { TestInfo } from "../../../types/Item";
import { useRouter } from "next/navigation";

interface ItemListProps {
	itemList: TestInfo[];
}

const ItemList = ({ itemList }: ItemListProps) => {
	const router = useRouter();

	useEffect(() => {
		sessionStorage.removeItem("selectedItem");
	}, []);

	// 아이템을 클릭하면 sessionStorage에 저장하고 Detail 페이지로 이동
	const handleItemClick = (item: TestInfo) => {
		sessionStorage.setItem("selectedItem", JSON.stringify(item)); // 선택된 아이템 객체를 sessionStorage에 저장
		router.push(`/detail/${item.id}`); // item id를 사용하여 Detail 페이지로 이동
	};

	return (
		<>
			{itemList.map((item, index) => (
				<Link
					key={index}
					href={`/detail/${item.id}`}
					onClick={() => handleItemClick(item)}
				>
					<ItemCard mo={item} order={index + 1} />
				</Link>
			))}
		</>
	);
};

export default ItemList;
