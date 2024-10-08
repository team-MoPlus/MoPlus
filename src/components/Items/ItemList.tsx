import Link from "next/link";
import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
import { TestInfo } from "../../../types/Item";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { testInfoState } from "@/recoil/atoms";

interface ItemListProps {
	itemList: TestInfo[];
}

const ItemList = ({ itemList }: ItemListProps) => {
	const router = useRouter();

	const setTestInfo = useSetRecoilState<TestInfo>(testInfoState);

	useEffect(() => {
		sessionStorage.removeItem("testInfoState");
	}, []);

	// 아이템을 클릭하면 sessionStorage에 저장하고 Detail 페이지로 이동
	const handleItemClick = (item: TestInfo) => {
		setTestInfo((prevTestInfo) => ({
			...prevTestInfo, // 기존의 다른 속성 유지
			id: item.id,
		}));
		// sessionStorage.setItem("selectedItem", JSON.stringify(item)); // 선택된 아이템 객체를 sessionStorage에 저장
		router.push(`/detail/${item.id}`); // item id를 사용하여 Detail 페이지로 이동
	};

	return (
		<>
			{itemList.map((item, index) => (
				<ItemCard
					key={index}
					mo={item}
					order={index + 1}
					onClick={() => handleItemClick(item)}
				/>
			))}
		</>
	);
};

export default ItemList;
