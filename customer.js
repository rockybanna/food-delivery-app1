async function loadRestaurants() {

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")

  if (error) {
    console.error(error)
    return
  }

  const container = document.getElementById("restaurants")
  container.innerHTML = ""

  data.forEach(r => {

    const div = document.createElement("div")

    div.innerText = r.name + " (" + r.id + ")"

    container.appendChild(div)

  })

}



async function createOrder() {

  const restaurant_id = document.getElementById("restaurant_id").value
  const distance = document.getElementById("distance").value
  const payment_mode = document.getElementById("payment_mode").value

  const { data, error } = await supabase.rpc("create_order", {

    p_restaurant: restaurant_id,
    p_distance: distance,
    p_payment: payment_mode

  })

  if (error) {

    console.error("Order error:", error)
    alert("Order failed")

    return
  }

  alert("Order created: " + data)

}



document.addEventListener("DOMContentLoaded", () => {

  loadRestaurants()

})
