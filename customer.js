async function loadRestaurants() {

  const { data, error } =
  await supabase
  .from("restaurants")
  .select("*")

  if(error){
    console.error(error)
    return
  }

  const container = document.getElementById("restaurants")

  container.innerHTML = ""

  data.forEach(r => {

    const div = document.createElement("div")

    div.innerHTML =
    "<b>" + r.name + "</b> | id: " + r.id

    container.appendChild(div)

  })
}

async function createOrder(){

  const restaurant =
  document.getElementById("restaurant_id").value

  const distance =
  parseFloat(document.getElementById("distance").value)

  const payment =
  document.getElementById("payment_mode").value

  const orderAmount = 100

  const { data, error } =
  await supabase.rpc(
    "create_order",
    {
      p_restaurant_id: restaurant,
      p_payment_mode: payment,
      p_order_amount: orderAmount,
      p_distance_km: distance,
      p_prep_time: 20
    }
  )

  if(error){
    alert(error.message)
    return
  }

  alert("Order created: " + data)

}

window.onload = loadRestaurants
