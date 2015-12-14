module.exports = function(location) {
  let info = {};
  if (location.pathname.indexOf('goals') !== -1) {
    info.category = "goals";
    info.inGoals = true;
    info.id = location.pathname.split("/goals/")[1];
  } else if (location.pathname.indexOf('timeline') !== -1) {
    info.category = "timeline";
    info.inTimeline = true;
  } else if (location.pathname.indexOf('characteristics') !== -1) {
    info.category = "characteristics";
    info.inCharacteristics = true;
    info.id = location.pathname.split("/characteristics/")[1];
  } else {
    info.category = "intro";
    info.intro = true;
  }
  return info;
}