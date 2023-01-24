import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [groups, setGroups] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("Tasks list");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  function initData(data) {
    setGroups(data);
  };

  function getDataId(data, index) {
    return data[index].id;
  };

  function updateSelectedGroupData(data, id) {
    setSelectedId(id);
    updateGroupTitle(data, id);
    updateGroupTasks(data, id);
  };

  function updateGroupTitle(data, id) {
    //console.log(data);
    //console.log(id);

    var groupTitle = null;
    var currentGroupData = null;

    currentGroupData = data.find(item => item.id === id)
    groupTitle = currentGroupData.title;
    setSelectedTitle(groupTitle);

    //console.log(groupTitle);
  };

  function updateGroupTasks(data, id) {
    var groupData = [];
    var groupTasks = [];

    groupData = data.find(item => item.id === id);
    if (groupData) groupTasks = groupData.tasks ;

    setTasks(groupTasks);

    //console.log(groupTasks);
  };

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok)
          throw Error("Couldn't fetch the data for that resource'");
        return res.json();
        })
      .then((result) => {
        initData(result.data);
        setIsPending(false);
        setError(null);
      })
      .catch(error => {
        setIsPending(false);
        setError(error.message);
      })
  }, []);

  return { groups, tasks, selectedId, selectedTitle, isPending, error };
}

export default useFetch;