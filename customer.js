document.addEventListener("DOMContentLoaded", () => {
  loadRestaurants();
});

/* LOGIN */

async function login() {

  const phone = prompt("Enter phone with country code");

  const { error } = await supabaseClient.auth.signInWithOtp({
    phone: phone
  });

  if (error) {
    console.log(error);
    alert("Login failed");
  } else {
    alert("OTP sent");
  }

}

/* LOGOUT */

async function logout() {

  await supabaseClient.auth.signOut();
  alert("Logged out");

}

/* LOAD RESTAURANTS */

async function loadRestaurants() {

  const { data, error } = await supabaseClient
    .from("restaurants")
    .select("id,name");

  if (error) {
    console.log(error);
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

  const { data, error } =
    await supabaseClient.rpc("create_order", {

      p_restaurant_id: restaurant_id,
      p_payment_mode: payment_mode,
      p_order_amount: order_amount,
      p_distance_km: distance,
      p_prep_time: prep_time

    });

  if (error) {
    console.log(error);
    alert("Order failed");
    return;
  }

  alert("Order created: " + data);

}
