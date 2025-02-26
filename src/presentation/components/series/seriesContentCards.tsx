import { Layout, Text } from "@ui-kitten/components"
import { RoutineType } from "../../../domain/entities/routines.type"
import { MyCard } from "../UI/MyCards"
import { MyButton } from "../UI/MyButton"
import { SubTitle } from "../UI/SubTitle"
import { msRoutineTraking } from "../../../api/msRoutineTraking"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/StackNavigation"
import { MyAlert } from "../UI/MyAlert"
import { useAuthStore } from "../../hooks/useLogin"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
    data?: RoutineType[]
}

export const SeriesContentCards = ({ data = [] }: Props) => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { user } = useAuthStore();

    const insertRoutineTraking = async (id: string) => {
        try {
            const res = await msRoutineTraking.insertRoutineTraking({routineId: id});
            await msRoutineTraking.updateRoutineTraking(res!.id, { state: 'active' });
            queryClient.invalidateQueries({ queryKey: ['routinesTraking', `${user!.id}`]});
            queryClient.invalidateQueries({ queryKey: ['routine_traking_exercise', `${user!.id}`]});
            navigation.navigate('RoutineTraking', { id: res!.id });
        } catch (error) {
            MyAlert({ title: "Error", subTitle: "Error al iniciar rutina.", onSelectOk: () => console.log("OK presionado") });
        }
    }
    
    return (
        <Layout>
        <Layout style={{alignItems: 'center', marginVertical: 5}}>
            <SubTitle text="Nueva Rutina" />
        </Layout>
            {
                data.map( item => 
                    <MyCard key={item.id}>
                        <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text category='h2' style={{color: '#bbb5c6'}}>{item.name}</Text>
                            <Text category='h5' style={{color: '#bbb5c6'}}>{`Ejercicios: ${item.exercises.length}`}</Text>
                            <Layout style={{height: 15}}/>
                            <MyButton text="Iniciar" size="small" onSelect={() => insertRoutineTraking(item.id)}/>
                        </Layout>
                    </MyCard>
                )
            }
        </Layout>
    )
}