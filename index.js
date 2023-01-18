async function placesAPI(keyword,latitude,longitude,radius,apiKey,pages) {
  let fetchs = []
  try {

  var outputRaw = [ ["Name", "Place ID", "adress", "Types", "Website", "Phone number"]]
  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;

  let nextPageToken = null;

  for (let i = 1; i <= pages; i++) {
    const fetch = await fetchPlaceAPI(url, apiKey, nextPageToken && nextPageToken );
    nextPageToken = fetch.nextPageToken;
    fetchs = fetchs.concat(fetch.output)
    if (i < pages) {
      await Utilities.sleep(1500);
    }
  }
  }
  catch(error) {
    console.log(error);
  }

  const output = outputRaw.concat(fetchs)
  return(output); // added this code to put the value on the cell
}


async function fetchPlaceAPI(url, apiKey, pageToken) {
  // Model : [ ["Name", "Place ID", "adress", "Types", "Website", "Phone number"]]
  const output = [];
  
  if (pageToken) {
    url = url + `&pagetoken=${pageToken}`
  }
  
  let nextPageToken = null
  try {

  var response = UrlFetchApp.fetch(url)
  var payload = JSON.parse(response);
  nextPageToken = payload.next_page_token;
  for (var i = 0; i < payload.results.length; i++){
    const payloadDetail = await placesDetailAPI(payload.results[i].place_id, apiKey);

    var inner = [ payload.results[i].name, payload.results[i].place_id, payload.results[i].vicinity, payload.results[i].types.toString(), payloadDetail.result?.website ? payloadDetail.result.website : 'no website', payloadDetail.result?.formatted_phone_number ? payloadDetail.result.formatted_phone_number : 'no number'];
    output.push(inner);
    }
  } catch(error) {
    console.log(error);
  }

  return {output, nextPageToken};
}


function placesDetailAPI(placeId, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=fr&fields=website,formatted_phone_number&key=${apiKey}`;
  var response = UrlFetchApp.fetch(url);
  payload = JSON.parse(response);
return payload;
}