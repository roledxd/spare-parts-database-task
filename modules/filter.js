function filterParts(parts, query) {
  // Destructure query parameters
  const { name, sn } = query;

  // Filter parts based on query parameters
  const filteredParts = parts.filter(part => {
    // Check if name matches (case-insensitive)
    if (name && !part.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }
    // Check if sn matches
    if (sn && part.sn !== sn) {
      return false;
    }
    return true;
  });

  return filteredParts;
}

module.exports = { filterParts };
