import axios from "axios"

export const FoodService = {
    async GetPost() {
        const response = await axios.get(`http://localhost:3000/food`)
        return response
    },
    async PostPost(data) {
        const response = await axios.post(`http://localhost:3000/food`,data)
        return response
    },
    async DeletePost(id, data) {
        const response = await axios.delete(`http://localhost:3000/food/${id}`, data)
        return response
    },
    async PatchPost(id, data) {
      const response = await axios.patch(`http://localhost:3000/food/${id}`, data);
      return response;
    },
    async PostPostBasket(data) {
        const response = await axios.post(`http://localhost:3000/basket`, data)
        return response
    },
}
export const UsersService = {
    async PostUsers(data) {
        const response = await axios.post(`http://localhost:3000/users`,data)
        return response 
    },
    async GetUsers() {
        const response = await axios.get(`http://localhost:3000/users`)
        return response 
    }

}
