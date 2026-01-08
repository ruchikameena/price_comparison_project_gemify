// this file is not used till now..either gonna remove it or integrate it in the project
import React, { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fontStyle, setFontStyle] = useState(localStorage.getItem("fontStyle") || "Arial");
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "16px");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontStyle", fontStyle);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("language", language);
  }, [theme, fontStyle, fontSize, language]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, fontStyle, setFontStyle, fontSize, setFontSize, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};
