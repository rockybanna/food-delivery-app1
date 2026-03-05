// --- LOGIN ---

async function login() {

  const { data, error } = await client.auth.signInAnonymously();

  if (error) {
    console.error("Login error:", error);
    alert("Login failed");
    return;
  }

  console.log("Login success");
  loadRestaurants();
}


// --- LOGOUT ---

async function logout() {
  await client.auth.signOut();
  console.log("Logged out");
}


// --- LOAD RESTAURANTS ---

async function loadRestaurants() {

  const { data, error } = await client
    .from("restaurants")
    .select("*");

  if (error) {
    console.error("Restaurant load error:", error);
    return;
  }

  const container = document.getElementById("restaurants");
  container.innerHTML = "";

  data.forEach(r => {

    const div = document.createElement("div");
    div.innerHTML = `${r.name} (${r.id})`;

    container.appendChild(div);

  });

}


// --- CREATE ORDER ---

async function createOrder() {

  const restaurant_id = document.getElementById("restaurant_id").value;
  const distance = document.getElementById("distance").value;
  const payment_mode = document.getElementById("payment_mode").value;

  const { data: userData } = await client.auth.getUser();

  const { error } = await client
    .from("orders")
    .insert({
      customer_user_id: userData.user.id,
      restaurant_id: restaurant_id,
      distance_km: distance,
      payment_mode: payment_mode
    });

  if (error) {
    console.error("Order error:", error);
    alert("Order failed");
    return;
  }

  alert("Order created");

}
