import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FoodService } from "../../Service/Service";
import { useState } from "react";
import Food from "../Navigation/Navbar/Food/Food";

function BasicExample({ el, handleSetPosts}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChanging, setisChanging] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(el.title);
  const [editDesc, setEditDesc] = useState(el.desc);
  const [editPrice, setEditPrice] = useState(el.price);
  const [buttonPressed, setButtonPressed] = useState(false);  

  const handleSetPostsBuy = async () => {
    const post = {
      desc: el.description,title: el.title,img: el.photo,price: el.price,goodId: el.id
    };
    const response = await FoodService.PostPostBasket(post);
    console.log(response + 'sdfdgfh');
  };
  const handleButtonClick = () => {
    
    setButtonPressed((prevButtonPressed) => !prevButtonPressed);
    handleSetPostsBuy()
    handleGetFood()

  };


  const handleDeleteFood = async (id) => {
    const {data} = await FoodService.DeletePost(id);
    console.log(data);
    handleSetPosts((prev) => prev.filter((el) => el.id !== data.id));
  }

  const handleGetFood = async () => {
    const { data } = await FoodService.GetPost();
    console.log(data, el.id)
  };

  // const handleGetUser = async () => {
  //   const  {data}  = await UsersService.GetUsers()
  //   setIsAdmin(data)
  //   console.log(data);
  // }

  const handleEditFood = () => {
    setisChanging(true);
    setIsEdit(true);
  };

const handleSaveFood = async () => {
  setisChanging(false);
  setIsEdit(false);

  const updatedData = {
    title: editTitle,
    desc: editDesc,
    price: editPrice,
  };

  try {
    const response = await FoodService.PatchPost(el.id, updatedData);
    handleSetPosts()
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
return (
  
  <Card style={{ width: "18rem", marginTop: "40px" }}>
     <Card.Img
        variant="top"
        src={el.img}
        style={{ width: "286.8px", height: "200px" }}
      />
      <Card.Body>
        <Card.Title style={{ fontFamily: "sans-serif" }}>
          {isChanging ? (
            <input
              placeholder="Название:"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          ) : (
            el.title
          )}
        </Card.Title>
        <Card.Text>
          {isChanging ? (
            <input
              placeholder="Описание"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
          ) : (
            el.desc
          )}
        </Card.Text>
        <Card.Text>
          {isChanging ? (
            <input
              placeholder="Цена"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
            />
          ) : (
            el.price
          )}
        </Card.Text>
        </Card.Body>
    <button
      onClick={handleButtonClick}
      style={{
        borderWidth: "1px",
        padding: "5.9px 7px",
        borderRadius: "3px",
        color: buttonPressed ? "white" : "green",
        backgroundColor: buttonPressed ? "green" : "#ffffff",
        borderColor: "green",
      }}
    >
      Добавить
    </button>

    {isAdmin && (
      <>
        <button
          onClick={() => {
            handleDeleteFood(el.id);
          }}
          style={{
            borderWidth: "1px",
            padding: "1.5px 5px",
            borderRadius: "3px",
            color: buttonPressed ? "white" : "red",
            backgroundColor: buttonPressed ? "red" : "#ffffff",
            borderColor: "red",
          }}
        >
          Удалить
        </button>
        <button
          onClick={() => {
            isEdit ? handleSaveFood() : handleEditFood();
          }}
          style={{
            borderWidth: "1px",
            padding: "1.5px 5px",
            borderRadius: "3px",
            color: buttonPressed ? "white" : "rgba(0, 0, 0)",
            backgroundColor: buttonPressed ? "rgba(0, 0, 0)" : "#ffffff",
            borderColor: "rgba(0, 0, 0)",
          }}
        >
          {isEdit ? "Сохранить" : "Изменить"}
        </button>
      </>
    )}
  </Card>
      
);
}

export default BasicExample;