const loginBtn = document.getElementById("loginBtn")
const logoutBtn = document.getElementById("logoutBtn")
const restaurantsDiv = document.getElementById("restaurants")

loginBtn.onclick = async function () {

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    alert("Login failed")
    console.error(error)
    return
  }

  alert("Login successful")

  loadRestaurants()
}

logoutBtn.onclick = async function () {

  await supabase.auth.signOut()

  restaurantsDiv.innerHTML = ""
}

async function loadRestaurants() {

  const { data, error } = await supabase
    .from("restaurants")
    .select("id,name")

  if (error) {
    console.error(error)
    alert("Restaurant load failed")
    return
  }

  restaurantsDiv.innerHTML = ""

  data.forEach(r => {

    const div = document.createElement("div")

    div.innerHTML =
      "<b>" + r.name + "</b><br>ID: " + r.id + "<br><br>"

    restaurantsDiv.appendChild(div)

  })
}

async function createOrder() {

  const restaurantId = document.getElementById("restaurantId").value
  const distance = document.getElementById("distance").value
  const payment = document.getElementById("payment").value

  const { data, error } = await supabase.rpc("create_order", {
    p_restaurant_id: restaurantId,
    p_payment_mode: payment,
    p_order_amount: 200,
    p_distance_km: distance,
    p_prep_time: 20
  })

  if (error) {
    console.error(error)
    alert("Order failed")
    return
  }

  alert("Order created: " + data)
}
