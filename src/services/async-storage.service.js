export const storageService = {
  query,
  get,
  post,
  put,
  remove,
};

function query(entityType, filterBy, delay = 500) {
  let entities =
    JSON.parse(localStorage.getItem(entityType)) || _createBooks();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(entities);
    }, delay);
  });
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const book = entities.find((entity) => entity._id === entityId);
    return book;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity) => entity._id === updatedEntity._id
    );
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function post(entityType, newEntity) {
  newEntity._id = _makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 4) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function _createBooks() {
  const books = [
    {
      _id: _makeId(),
      cmpsOrder: [
        "status-picker",
        "member-picker",
        "type-picker",
        "date-picker",
        "priority-picker",
        "role-picker",
        "text",
        "cost"
      ],
      title: "Sprint 4",
      description:
        "This book is for managing a single project. You can customize this book to suit your project needs: add columns, subtasks, automations, dashbooks and more!",
      // "createdAt": 1589983468418,
      createdBy: {
        _id: "u101",
        acronyms: "ME",
        fullname: "May Elgrat",
        username: "May Elgrat",
        imgUrl:
          "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
      },
      statuses: [
        { id: "la123", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
        { id: "la555", value: "Done", bgColor: "#00C875", color: "#fff" },
        { id: "la666", value: "Stuck", bgColor: "#E2445C", color: "#fff" },
        { id: "la777", value: "Working on it", bgColor: "#ffcb00", color: "#fff" },
      ],
      priorities: [
        { id: "lb111", value: "Empty", bgColor: "#c4c4c4", color: " #c4c4c4" },
        { id: "lb222", value: "Low", bgColor: "#66ccff", color: " #fff" },
        { id: "lb333", value: "Medium", bgColor: "#0086c0", color: "#fff" },
        { id: "lb444", value: "High", bgColor: "#225091", color: "#fff" },
      ],
      members: [
        {
          _id: "u101",
          acronyms: "ME",
          fullname: "May Elgrat",
          username: "May Elgrat",
          imgUrl:
            "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
        },
        {
          _id: "u108",
          acronyms: "LS",
          fullname: "Lee Segal",
          username: "Lee Segal",
          imgUrl: "http://some-img",
        },
        {
          _id: "u1099",
          acronyms: "ZR",
          fullname: "Zohar Rosenbush",
          username: "Zohar Rosenbush",
          imgUrl: "http://some-img",
        },
      ],
      types: [
        { id: "tp111", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
        { id: "tp222", value: "Quality", bgColor: "#fcc4f7", color: "#fff" },
        { id: "tp333", value: "Feature", bgColor: "#00c875", color: "#fff" },
        { id: "tp444", value: "Bug", bgColor: "#e2445c", color: "#fff" },
        { id: "tp555", value: "Improvement", bgColor: "#a25ddc", color: "#fff" },
        { id: "tp666", value: "Security", bgColor: "#ffadad", color: "#fff" },
      ],
      roles: [
        { id: "rl111", value: "Empty", bgColor: "#c4c4c4", color: "#c4c4c4" },
        { id: "rl222", value: "Dev", bgColor: "#279165", color: "#fff" },
        { id: "rl333", value: "Design", bgColor: "#0086c0", color: "#fff" },
        { id: "rl444", value: "Product", bgColor: "#a25ddc", color: "#fff" },
      ],
      groups: [
        {
          id: "p101",
          title: "Group 1",
          tasks: [
            {
              id: "w101",
              title: "Replace Logo",
              status: "Done",
              priority: "High",
              cost: 0,
              role: "Dev",
              text: "hello",
              type: "Security",
              activities: [],
              timeline: ["Jan 18-22", "Jan 20-22"],
              owner: [
                {
                  _id: "u1099",
                  acronyms: "ZR",
                  fullname: "Zohar Rosenbush",
                  username: "Zohar Rosenbush",
                  imgUrl: "http://some-img",
                },
              ],
              comments: [
                {
                  id: "Zdrnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 15909998174360,
                  byMember: {
                    _id: "u108",
                    acronyms: "LS",
                    fullname: "Lee Segal",
                    username: "Lee Segal",
                    imgUrl: "http://some-img",
                  },
                },
              ],
            }, {
              id: "c101",
              title: "Replace Logo",
              status: "Done",
              priority: "High",
              text: "lalaa",
              cost: 0,
              role: "Design",
              type: "Bug",
              activities: [],
              timeline: ["Jan 30-22", "Feb 02-22"],
              owner: [
                {
                  _id: "u1099",
                  acronyms: "ZR",
                  fullname: "Zohar Rosenbush",
                  username: "Zohar Rosenbush",
                  imgUrl: "http://some-img",
                },
              ],
              comments: [
                {
                  id: "ZdPkm",
                  txt: "also @yaronb please CR this",
                  createdAt: 15909998174360,
                  byMember: {
                    _id: "u108",
                    acronyms: "LS",
                    fullname: "Lee Segal",
                    username: "Lee Segal",
                    imgUrl: "http://some-img",
                  },
                },
              ],
            }
          ],
          style: { groupColor: getNiceRandomColor() },

        },
      ],
    },
  ];
  localStorage.setItem("bookDB", JSON.stringify(books));
  return books;
}

function getNiceRandomColor() {
  let red = "#E2445C";
  let orange = "#ffcb00";
  let green = "#00d647";
  let lightgreen = "#00C875";
  let blue = "#0073ea";
  let darkblue = "#292f4c";

  let niceColors = [darkblue, lightgreen, blue, green, orange, red];
  let drawnNum = getRandomIntInclusive(0, niceColors.length);
  let randColor = niceColors[drawnNum];
  return randColor;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

