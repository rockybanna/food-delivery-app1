const supabase = window.supabaseClient;

document.addEventListener("DOMContentLoaded", async () => {
  loadRestaurants();
});

/* LOGIN */

async function login() {

  const phone = prompt("Enter phone number");

  const { error } = await supabase.auth.signInWithOtp({
    phone: phone
  });

  if (error) {
    alert("Login error");
    console.error(error);
  } else {
    alert("OTP sent");
  }

}

/* LOGOUT */

async function logout() {

  await supabase.auth.signOut();
  alert("Logged out");

}

/* LOAD RESTAURANTS */

async function loadRestaurants() {

  const { data, error } = await supabase
    .from("restaurants")
    .select("id,name");

  if (error) {
    console.error("Restaurant load error:", error);
    return;
  }

  const container = document.getElementById("restaurants");
  container.innerHTML = "";

  data.forEach(r => {

    const div = document.createElement("div");
    div.innerText = r.name + " (" + r.id + ")";
    container.appendChild(div);

  });

}

/* CREATE ORDER */

async function createOrder() {

  const restaurant_id =
    document.getElementById("restaurant_id").value;

  const distance =
    parseFloat(document.getElementById("distance").value);

  const payment_mode =
    document.getElementById("payment_mode").value;

  const order_amount = 200;
  const prep_time = 15;

  const { data, error } = await supabase.rpc("create_order", {

    p_restaurant_id: restaurant_id,
    p_payment_mode: payment_mode,
    p_order_amount: order_amount,
    p_distance_km: distance,
    p_prep_time: prep_time

  });

  if (error) {

    console.error("Order error:", error);
    alert("Order failed");
    return;

  }

  alert("Order created: " + data);

}
