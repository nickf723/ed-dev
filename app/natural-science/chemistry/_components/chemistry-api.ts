export type APIElement = {
    number: number;
    symbol: string;
    name: string;
    category: string;
    atomic_mass: number;
    electron_configuration: string;
    xpos: number;
    ypos: number;
};

export async function fetchPeriodicTable(): Promise<APIElement[]> {
    try {
        // The definitive open-source periodic table JSON
        const response = await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');
        const data = await response.json();
        return data.elements;
    } catch (error) {
        console.error("Failed to fetch elements:", error);
        return [];
    }
}